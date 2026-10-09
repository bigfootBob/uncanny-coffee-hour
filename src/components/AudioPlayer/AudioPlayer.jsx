import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { formatTime } from '../../utils/formatTime';
import './AudioPlayer.scss';

const AudioPlayer = ({ src, className = '' }) => {
    const { t } = useTranslation();
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const setAudioData = () => {
            setDuration(audio.duration);
        };

        const updateProgress = () => {
            setProgress(audio.currentTime);
        };

        const onEnded = () => {
            setIsPlaying(false);
            setProgress(0);
        };

        audio.addEventListener('loadedmetadata', setAudioData);
        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('ended', onEnded);

        return () => {
            audio.removeEventListener('loadedmetadata', setAudioData);
            audio.removeEventListener('timeupdate', updateProgress);
            audio.removeEventListener('ended', onEnded);
        };
    }, []);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play()
                .then(() => setIsPlaying(true))
                .catch(() => setIsPlaying(false));
        }
    };

    const handleProgressChange = (e) => {
        const newTime = Number(e.target.value);
        audioRef.current.currentTime = newTime;
        setProgress(newTime);
    };

    return (
        <div className={`uncanny-audio-player ${className}`}>
            <audio ref={audioRef} src={src} preload="metadata">
                <track kind="captions" />
            </audio>

            <button
                className={`play-btn ${isPlaying ? 'playing' : ''}`}
                onClick={togglePlay}
                aria-label={isPlaying ? t('a11y.pause') : t('a11y.play')}
            >
                {isPlaying ? (
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
                ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M8 5v14l11-7z" /></svg>
                )}
            </button>

            <div className="audio-controls">
                <div className="time-display">
                    <span>{formatTime(progress)}</span>
                    <span className="separator">/</span>
                    <span>{formatTime(duration)}</span>
                </div>

                <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={progress}
                    onChange={handleProgressChange}
                    className="progress-bar"
                    aria-label={t('a11y.seek')}
                    aria-valuetext={t('a11y.seek_value', { current: formatTime(progress), total: formatTime(duration) })}
                    style={{
                        backgroundSize: `${duration ? (progress / duration) * 100 : 0}% 100%`
                    }}
                />
            </div>
        </div>
    );
};

export default AudioPlayer;
