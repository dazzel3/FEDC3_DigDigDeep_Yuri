import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

interface ImageProps {
  src: string;
  alt: string;
  objectFit?: 'contain' | 'cover';
}

const Image = ({ src, alt, objectFit = 'cover' }: ImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const imageElement = useRef<HTMLImageElement>(null);

  const onLoad = () => {
    setLoaded(true);
  };

  useEffect(() => {
    setLoaded(false);
  }, [src]);

  useEffect(() => {
    if (!imageElement.current) return;
    if (imageElement.current.complete) {
      setLoaded(true);
    }
  }, []);

  return (
    <>
      <StyledImage
        ref={imageElement}
        src={src}
        alt={alt}
        onLoad={onLoad}
        loaded={loaded}
        style={{ objectFit: objectFit }}
      />
      {!loaded && <Skleton />}
    </>
  );
};

export default Image;

const Skleton = styled.div`
  width: 100%;
  height: 100%;
  display: inline-block;
  border-radius: inherit;
  background-image: linear-gradient(
    90deg,
    #dfe3e8 0px,
    #efefef 40px,
    #dfe3e8 80px
  );
  background-size: 200% 100%;
  background-position: 0 center;
  animation: skeleton--zoom-in 0.2s ease-out,
    skeleton--loading 2s infinite linear;

  @keyframes skeleton--zoom-in {
    0% {
      opacity: 0;
      transform: scale(0.95);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes skeleton--loading {
    0% {
      background-position-x: 100%;
    }
    50% {
      background-position-x: -100%;
    }
    100% {
      background-position-x: -100%;
    }
  }
`;

const StyledImage = styled.img<{ loaded: boolean }>`
  width: 100%;
  height: 100%;
  opacity: ${({ loaded }) => (loaded ? '1' : '0')};
  position: ${({ loaded }) => (loaded ? 'unset' : 'absolute')};
  transition: all 0.5s ease-in;
  border-radius: inherit;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
`;
