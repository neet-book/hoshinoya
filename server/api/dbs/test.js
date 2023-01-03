const RateInfoModel = require('./mongo/models/HotelRateInfo')
const axios = require('axios')
const mongoose = require('mongoose')
const { mongodbs, mysqldbs } = require('../../config')
const http = require('http')
const path = require('path')
const fs = require('fs')
const { Buffer } = require('buffer')
const host = '127.0.0.1'
const post = 3030

const SQLDB = require('./mysqldb')

const mysql = require('mysql')

const connection = new SQLDB({
    host: mysqldbs.host,
    user: mysqldbs.user,
    password: mysqldbs.password,
    database: mysqldbs.dbName
})

const header = {
    accept: "application/json, text/plain, */*",
    // cookies: "_ts_yjad=1657273940709; uid=wKj0rmLH/lRk3iJ3giU1Ag==; _gcl_au=1.1.121441937.1669101786; _gid=GA1.2.50257862.1669790002; JSESSIONID=9BAFB8CE492DCEB69A694E0046AA3A75; _ga=GA1.2.795767448.1657273941; _gat=1; YGETSID=1669862727968_e66b57bd-3e6c-49f2-8332-1a1a6e104b90; AWSALB=x9R06GozZ0jjYhVdegSSgItKSrqaA2HRS5Ec7flQXQqt4dce2MJuv6o/vIBFkkqujmHCKOaVYkeAQAnIyFNDiiGOgMVs2HlOpvO1nODsa9ZP5gesFA7R5RDx1TeV; AWSALBCORS=x9R06GozZ0jjYhVdegSSgItKSrqaA2HRS5Ec7flQXQqt4dce2MJuv6o/vIBFkkqujmHCKOaVYkeAQAnIyFNDiiGOgMVs2HlOpvO1nODsa9ZP5gesFA7R5RDx1TeV; locale=ja; _ga_59ZVB3VRMV=GS1.1.1669862726.20.1.1669862741.45.0.0; _ga_CL9K4QLQX4=GS1.1.1669862726.20.1.1669862741.0.0.0",
    "sec-ch-ua": `Microsoft Edge";v="107", "Chromium";v="107", "Not=A?Brand";v="24"`,
    "user-agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.62`

}

const hotels = [
    { n: 'karuizawa', nzh: '轻井泽', id: '0000000001'},
    { n: 'kyoto', nzh: '京都', id: '0000000007'},
    { n: 'fuji', nzh: '富士', id: '0000000014'},
    { n: 'taketomi_island', nzh: '竹富岛', id: '0000000010'},
    { n: 'okinawa', nzh: '冲绳', id:'0000000018'},
    { n: 'tokyo', nzh: '东京', id: '0000000015'},
    { n: 'bali', nzh: '巴厘岛', id: '0000000502' },
    { n: 'guguan', nzh: '谷关', id: '0000000503'}
]

async function downloadPhoto(source, rootpath) {
    const host = 'https://hoshinoresorts.com'

    const re = await axios.get(encodeURI(host + source), {
        responseType: 'arraybuffer'
    })
      .catch(e => {
          console.log(`[${source}] 下载失败`)
          return null
      })
    if (re === null) return re
    const data = re.data
    const p = path.parse(source)
    const filename = path.join(__dirname, rootpath, p.base)
    const dirPath = path.join(__dirname, rootpath)
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, {recursive: true})
    }

    fs.writeFile(filename, Buffer.from(data, 'binary'), { flag: 'w+'}, err => {
        if(err) return console.log(`[${filename}] error: `, err)
        // console.log(`${rootpath + p.base} download success.`)
    })

    return rootpath + p.base
}

async function pathRoomInfo(hotelName, hotelId, nzh) {
    const [hotelResult] = await connection.select('hotels',['hotel_id'], `hotel_name="${hotelName}"` )

    const dbHotelId = hotelResult[0].hotel_id

    const params = {
        hotelId: hotelId,
        checkIn: '2023/02/24',
        stayLength: 2,
        adult: 2,
        underTwelve: 0,
        underSeven: 0,
        underFour: 0,
        lang: 'ZH',
        _: Date.now()
    }

    const rate = 0.050686

    const { data: { roomList: roomDataList } } = await axios.get('https://hoshinoresorts.com/api/rooms', {
        headers: header,
        params
    })
    for (let roomData of roomDataList) {
        await connection.insert('rooms', {
            area_min: roomData.area.min,
            area_max: roomData.area.max,
            bed_description: roomData.bedDescription,
            capacity_min: roomData.capacity.min,
            capacity_max: roomData.capacity.max,
            introduction: roomData.introduction,
            title: roomData.title,
            hotel_id: dbHotelId,
            recommend_rank: roomData.recommendRank,
            extra_bed: roomData.extraBed,
            room_specifications:  JSON.stringify(roomData.roomSpecifications)

        })
          .then(async (r) => {
              console.log(`hotel: ${hotelName}, room: ${roomData.title} 添加成功`)
          })
          .catch(e => console.log(`hotel: ${hotelName} 添加失败，${e}`, roomData))

        const [result] = await connection.select('rooms', ['room_id'], `title="${roomData.title}"`)
        const roomID = result[0].room_id
        const photos = []
        for (let source of roomData.photos) {
            let filename = await downloadPhoto(source, `/image/room/hotel-${dbHotelId}/room-${roomID}`)
            if (filename !== null) {
                photos.push(filename)
            }
        }

        connection.update('rooms', { photos: JSON.stringify(photos) }, `room_id=${roomID}`)
          .then(re => console.log(`hotel: ${hotelName}, room: ${roomData.title} 更新成功`))
          .catch(err => console.log(`hotel: ${hotelName}, room: ${roomData.title} 更新失败 ${err}`, photos))
    }
}

async function getRoomPlans(hotelId, dbHotelId, hotelName, hotelNameZh) {
    const params = {
        hotelId: hotelId,
        checkIn: '2023/02/24',
        stayLength: 2,
        adult: 2,
        underTwelve: 0,
        underSeven: 0,
        underFour: 0,
        lang: 'ZH',
        _: Date.now()
    }

    const rate = 0.050686

    const { data: { roomList } } = await axios.get('https://hoshinoresorts.com/api/rooms', {
        headers: header,
        params
    })


    const [roomsDataFromDB]  = await connection.select('rooms', ['room_id', 'title'], `hotel_id="${dbHotelId}"`)
    if (roomsDataFromDB.length === 0) return console.log(`为查询到${dbHotelId}房间信息`)
    for (const room of roomList) {
        const [{room_id: roomIdFromDB}] = roomsDataFromDB.filter(item => item.title === room.title)

        const params = {
            hotelId,
            roomId: roomList.roomId,
            checkIn: '2023/02/24',
            adult: 2,
            underFour: 0,
            underSeven: 0,
            underTwelve: 0,
            stayLength: 2,
            lang:'ZH',
            _: Date.now()
        }

        const { data: {planList} } = await axios.get('https://hoshinoresorts.com/api/plans', {
            headers: header,
            params
        })



        for (let i in planList) {
            const plan = planList[i]
            const insertData = {
                coupon_usable: plan.couponUsable,
                refundable: plan.refundable,
                cancel_role: JSON.stringify(plan.cancelRule),
                check_in: plan.checkInTime || "15:00",
                check_out: plan.checkOutTime || "12:00",
                check_end: plan.checkInEndTime || "15:00",
                room_id: roomIdFromDB,
                plan_order: i,
                characteristic_lsit: JSON.stringify(plan.characteristicList),
                unit_charge: (plan.charge.searchChargeDetail.unitCharge * rate).toFixed(2),
                total_charge: (plan.charge.searchChargeDetail.totalCharge * rate).toFixed(2),
                charge_detail: JSON.stringify(plan.charge.searchChargeDetail),
                introduction: plan.introduction
            }
            connection.insert('plans', insertData)
              .then(async (r) => {
                  console.log(`hotel: ${hotelName}, room: ${room.title} 添加成功`)
              })
              .catch(e => console.log(`hotel: ${hotelName}, room: ${room.title} 添加失败，${e}`, insertData))
        }
    }
}


async function updateHotelInfo(hotel_name, hotel) {
    const hotelParams = {
        hotelId: hotel.id,
        lang: 'ZH',
        _: Date.now()
    }

    const { data: hotelData } = await axios.get('https://hoshinoresorts.com/api/hotels/detail', {
        headers: header,
        params: hotelParams
    })
      .catch(e => console.log(e))
    connection.update('hotels', {
        search_condition: JSON.stringify( {
            infantNumMax: hotelData.infantNumMax,
            infantNumDefault: hotelData.infantNumDefault,
            adultNumMin: hotelData.adultNumMin,
            babyNumDefault: hotelData.babyNumDefault,
            babyNumMin: hotelData.babyNumMin,
            childNumMin: hotelData.childNumMin,
            hotelNightDefault: hotelData.hotelNightDefault,
            adultNumMax: hotelData.adultNumMax,
            infantNumMin: hotelData.infantNumMin,
            hotelNightMax: hotelData.hotelNightMax,
            hotelNightMin: hotelData.hotelNightMin,
            babyNumMax: hotelData.babyNumMax,
            adultNumDefault: hotelData.adultNumDefault,
            childNumDefault: hotelData.childNumDefault,
            childNumMax: hotelData.childNumMax
        })
    }, `hotel_name="${hotel_name}"`)
      .catch(e => console.log('更新失败', e))
}

async function run() {

    function transformTime(time) {
        // console.log(time)
        const [t, p] = time.split(' ')
        if (p === 'PM') {
           [h, m]  = t.split(':')
            // console.log(h, m)
           return [Number(h) + 12, m].join(':')
        }
        return t
    }

    for (let hotel of hotels) {
    //     // const hotelParams = {
    //     //     hotelId: hotel.id,
    //     //     lang: 'ZH',
    //     //     _: Date.now()
    //     // }
    //     //
    //     // const { data: hotelData } = await axios.get('https://hoshinoresorts.com/api/hotels/detail', {
    //     //     headers: header,
    //     //     params: hotelParams
    //     // })
    //     // connection.insert('hotels', {
    //     //     hotel_name: hotel.n,
    //     //     hotel_name_zh: hotel.nzh,
    //     //     address: hotelData.address,
    //     //     check_in: transformTime(hotelData.checkIn),
    //     //     check_out: transformTime(hotelData.checkOut),
    //     //     hotel_email: hotelData.hotelRepresentMail,
    //     //     max_stay_length: hotelData.maxStayLength,
    //     //     one_nignt_message: hotelData.oneNightLimitMessage,
    //     //     max_room_count: hotelData.maxRoomCount,
    //     //     phone_number: hotelData.phoneNumber,
    //     //     search_description_title: hotelData.searchDescriptonTitle,
    //     //     search_description_content: hotelData.searchDescriptionContent
    //     // })
    //     //   .then(r => console.log(`hotel: ${hotel.nzh} 添加成功`))
    //     //   .catch(e => console.log(`hotel: ${hotel.nzh} 添加失败，${e}`, hotelData))
    //
    //     // pathRoomInfo(hotel.n, hotel.id, hotel.nzh)
    //     const [result] = await connection.select('hotels', ['hotel_id'], `hotel_name="${hotel.n}"`)
    //     const hotelIdFromDb = result[0].hotel_id
    //     getRoomPlans(hotel.id, hotelIdFromDb, hotel.n, hotel.nzh).catch(e => console.log(`err: `, e, hotel))
        updateHotelInfo(hotel.n, hotel).catch(e => console.log(e, hotel))
    }



}

connection.connect().then(() => {
    run().catch(e => console.log(e.response, e.request))
})

const app = http.createServer((req, res) => {
    res.end('ok')
})

app.listen(post, host)