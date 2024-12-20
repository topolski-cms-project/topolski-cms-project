import './LoadingWheel.css';

export default function LoadingWheel({showDarkBackground}) {
    return <div id='loading-wheel' className={showDarkBackground ? "loading-wheel-background-dark" : ""}>
        <div id='loading-wheel-img'></div>
    </div>
}