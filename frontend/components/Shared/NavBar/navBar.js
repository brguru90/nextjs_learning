import Link from 'next/link'
import style from "./navbar.module.scss"

export default function navBar() {
    return (
        <div className={style.navbar}>
            <div className={style.logo}>
                <p>Next JS</p>
            </div>
            <div className={style.menu_wrap}>
                <ul className={style.menu}>
                    <li>
                        <span className={style.menu_item}>
                            <Link href="/" > Home </Link>
                        </span>
                    </li>
                    <li>
                        <span className={style.menu_item}>
                            <Link href="/page1" > Page1 </Link>
                        </span>
                    </li>
                    <li>
                        <span className={style.menu_item}>
                            <Link href="/page2" > Page2 </Link>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    )
}