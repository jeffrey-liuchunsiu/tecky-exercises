import style from "../css/style2.module.scss"

export default function ShoppingList() {

    // return (
    //     <div>{0}</div>
    // )

    const image = <img className={style.userIcon} src="/favicon.ico" />;
    return (
        <div className={style.mainPage}>
            <h1 className={style.header}>Shopping List</h1>
            <ul className={style.mainPage}>
                <li>Instagram</li>
                <li>WhatsApp</li>
                <li>Oculus</li>
            </ul>
            <div>{image}</div>
        </div>
    )
}