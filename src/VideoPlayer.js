import React, { useState, useRef, useEffect } from 'react';

const VideoPlayer = () => {
    const [volume, setVolume] = useState(1);
    const [playbackRate, setPlaybackRate] = useState(1);
    const videoRef = useRef(null);

    useEffect(() => {
        const savedSettings = JSON.parse(localStorage.getItem('videoSettings'));
        if (savedSettings) {
            videoRef.current.currentTime = savedSettings.currentTime;
            setVolume(savedSettings.volume);
            setPlaybackRate(savedSettings.playbackRate);
        }
    }, []);

    useEffect(() => {
        const handleBeforeUnload = () => {
            const settings = {
                currentTime: videoRef.current.currentTime,
                volume,
                playbackRate,
            };
            localStorage.setItem('videoSettings', JSON.stringify(settings));
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [volume, playbackRate]);

    const handlePlay = () => {
        videoRef.current.play();
    };

    const handlePause = () => {
        videoRef.current.pause();
    };

    const handleVolumeChange = (event) => {
        const newVolume = event.target.value;
        setVolume(newVolume);
        videoRef.current.volume = newVolume;
    };

    const handlePlaybackRateChange = (event) => {
        const newRate = event.target.value;
        setPlaybackRate(newRate);
        videoRef.current.playbackRate = newRate;
    };

    const handlePictureInPicture = () => {
        if (document.pictureInPictureEnabled && !videoRef.current.disablePictureInPicture) {
            videoRef.current.requestPictureInPicture();
        }
    };

    const handleFullScreen = () => {
        if (videoRef.current.requestFullscreen) {
            videoRef.current.requestFullscreen();
        } else if (videoRef.current.mozRequestFullScreen) {
            videoRef.current.mozRequestFullScreen();
        } else if (videoRef.current.webkitRequestFullscreen) {
            videoRef.current.webkitRequestFullscreen();
        } else if (videoRef.current.msRequestFullscreen) {
            videoRef.current.msRequestFullscreen();
        }
    };

    return (
        <div>
            <h1>Lesson Title</h1>
            <video ref={videoRef} src="/videos/video.mp4" controls poster="/thumbnail.jpg" />
            <button onClick={handlePlay}>Play</button>
            <button onClick={handlePause}>Pause</button>
            <button onClick={handlePictureInPicture}>Picture-in-Picture</button>
            <button onClick={handleFullScreen}>Full Screen</button>
            <div>
                <label>Volume: </label>
                <input type="range" min="0" max="1" step="0.1" value={volume} onChange={handleVolumeChange} />
            </div>
            <div>
                <label>Playback Rate: </label>
                <input type="range" min="0.5" max="2" step="0.1" value={playbackRate} onChange={handlePlaybackRateChange} />
            </div>
        </div>
    );
};

export default VideoPlayer;
