import './Reviews.css';

export default function Reviews() {
    return <div id='reviews-container'>
        <div id='user-reviews-container'>

        </div>
        <div id='add-review-container'>
            <span>DODAJ OPINIE</span>
            <span>Twój adres e-mail nie zostanie opublikowany. Wymagane pola są oznaczone <span style={{ color: "red" }}>*</span></span>
            <span>Twoja opinia <span style={{color:'red'}}>*</span></span>
            <textarea id='review-input'></textarea>
            <span>Nazwa<span style={{color:'red'}}>*</span></span>
            <input type='text' id='name-input'></input>
            <span>Wybierz zdjęcie (maksymalny rozmiar: 2000kB, maksymalnie 1 plik)</span>
            <input type='file' accept='image/png, image/jpg, image/jpeg'></input>
            <div id='send-review-bttn'>Wyślij</div>
        </div>
    </div>
}