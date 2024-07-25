import { Quote } from "../components/Quote"
import { Auth } from "../components/Auth"


export const Signin = () => {
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="col-span-1">
                    <Auth type="signin"/>
                </div>
                <div className="col-span-1 hidden lg:block">
                    <Quote />
                </div>
            </div>
        </>
    )
}