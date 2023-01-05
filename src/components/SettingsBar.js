import './SettingsBar.css';

export default function SettingsBar({ changeBoardDimensions, changeBoardIcons, iconOptions, popup, setPopup }) {
    const { candies, mammals, seaCreatures, birds } = iconOptions;

    function genOptions(start, finish) {
        let options = [];
        for (let i = start; i <= finish; i = i + 2) {
            const option = <option className="settings-popup__option" value={i}>{i}</option>
            options.push(option)
        }
        return options.map(o => o)
    }

    return (
        <div className="settings-bar">
            <button className="settings-title" onClick={() => setPopup('icons')}>Change Board Icons?</button>
            <button className="settings-title" onClick={() => setPopup('dimensions')}>Change Dimensions?</button>

            <div className="settings-popup" style={popup === 'icons' ? { opacity: '100%', zIndex: '100' } : {}}>
                <button className="settings-go-back" onClick={() => setPopup(null)}>Go Back</button>

                <button className="settings-popup__btn" onClick={() => changeBoardIcons(candies)}>candies</button>
                <button className="settings-popup__btn" onClick={() => changeBoardIcons(mammals)}>land animals</button>
                <button className="settings-popup__btn" onClick={() => changeBoardIcons(seaCreatures)}>sea creatures</button>
                <button className="settings-popup__btn" onClick={() => changeBoardIcons(birds)}>birds</button>
            </div>

            <div className="settings-popup" style={popup === 'dimensions' ? { opacity: '100%', zIndex: '100' } : {}} onSubmit={changeBoardDimensions}>
                <button className="settings-go-back" onClick={() => setPopup(null)}>Go Back</button>
                <form className="settings-popup__form">
                    <label className="settings-popup__label" htmlFor="height">Rows</label>
                    <select className="settings-popup__select" name='height' id='select-height'>
                        {genOptions(6, 20)}
                    </select>
                    <label className="settings-popup__label" htmlFor="width">Columns</label>
                    <select className="settings-popup__select" name='width' id='selectWidth'>
                        {genOptions(6, 20)}
                    </select>
                    <button className="settings-popup__btn" style={{ padding: '2rem' }} type='submit'>Update</button>
                </form>
            </div>
        </div>
    )
}