import Link from 'next/link'
import style from "./navbar.module.scss"

export default function NavBar() {
    return (
        <div className={style.navbar}>
            <div className={style.logo}>
                <p>Next JS</p>
            </div>
            <div className={style.menu_wrap}>
                <ul className={style.menu} d_type={process.env.DEPLOY}>
                    <li>
                        <span className={style.menu_item}>
                            <Link href="/"> Home </Link>
                        </span>
                    </li>
                    <li>
                        <span className={style.menu_item}>
                            <Link href="/page1"> Page1 </Link>
                        </span>
                    </li>
                    <li>
                        <span className={style.menu_item}>
                            <Link href="/page2" as={process.env.DEPLOY=="cdn"?"/page2.html":""}> Page2 </Link>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    )
}
