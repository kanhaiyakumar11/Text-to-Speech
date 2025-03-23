import { useState, useEffect } from "react";
import "./App.css"

const App = () => {
    const [text, setText] = useState("");
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [speed, setSpeed] = useState(1);
    const [pitch, setPitch] = useState(1);

    let speech = new SpeechSynthesisUtterance();

    useEffect(() => {
        const populateVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            setVoices(availableVoices);
            if (availableVoices.length > 0) {
                setSelectedVoice(availableVoices[0]);
            }
        };

        window.speechSynthesis.onvoiceschanged = populateVoices;
        populateVoices();
    }, []);

    const handleSpeak = () => {
        window.speechSynthesis.cancel();
        speech.text = text;
        speech.voice = selectedVoice;
        speech.rate = speed;
        speech.pitch = pitch;
        window.speechSynthesis.speak(speech);
    };

    const handlePause = () => {
        window.speechSynthesis.pause();
    };

    return (
        <div className="hero">
            <h1>Text To Speech <span>Converter</span></h1>
            <textarea
                placeholder="Write anything here.."
                value={text}
                onChange={(e) => setText(e.target.value)}
            ></textarea>
            <div className="row">
                <select
                    id="voiceSelect"
                    onChange={(e) => setSelectedVoice(voices[e.target.value])}
                >
                    {voices.map((voice, index) => (
                        <option key={index} value={index}>{voice.name}</option>
                    ))}
                </select>
                <button id="listenBtn" onClick={handleSpeak}> <i className="fas fa-play"></i> Listen</button>
                <button id="pauseBtn" onClick={handlePause}> <i className="fas fa-pause"></i> Pause</button>
            </div>
            <div className="controls">
                <div className="slider-container">
                    <label htmlFor="speed">Speed: <span>{speed}</span></label>
                    <input
                        type="range" id="speed" min="0.5" max="2" step="0.1"
                        value={speed} onChange={(e) => setSpeed(e.target.value)}
                    />
                </div>
                <div className="slider-container">
                    <label htmlFor="pitch">Pitch: <span>{pitch}</span></label>
                    <input
                        type="range" id="pitch" min="0.5" max="2" step="0.1"
                        value={pitch} onChange={(e) => setPitch(e.target.value)}
                    />
                </div>
            </div>
            <footer>
                <p>Made with ❤️ by <a href="https://example.com" target="_blank">Kanhaiya Kumar <br />& Bhuwan Kumar</a></p>
                <div className="social-links">
                    <a href="https://github.com/kanhaiyakumar11" target="_blank"><i className="fab fa-github"></i></a>
                    <a href="https://www.linkedin.com/in/kanhaiya-kumar-184166275/" target="_blank"><i className="fab fa-linkedin"></i></a>
                    <a href="https://kanhaiya-portfolio-vf06.onrender.com/" target="_blank"><i className="fa-solid fa-handshake-angle"></i></a>
                    <a href="https://www.instagram.com/prince_kanha05?igsh=ODZxcTNhaTFnbDVk" target="_blank"><i className="fab fa-instagram"></i></a>
                </div>
            </footer>
        </div>
    );
};

export default App;