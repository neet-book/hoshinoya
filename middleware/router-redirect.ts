import { Middleware } from "@nuxt/types"

const routerRedirect: Middleware = ({ route, redirect }) => {
    const path: string = route.path.endsWith('/') ? route.path.slice(0, route.path.length - 1) : route.path
    switch (path) {
        case '/hotel':
            redirect('/')
        break
    }
}

export default routerRedirect