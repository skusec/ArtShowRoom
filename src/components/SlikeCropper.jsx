import { useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

export default function SlikaCropper({ slika, onSpremi }) {

  const cropperRef = useRef(null);

  function spremiIzrezanuSliku() {

    const cropper = cropperRef.current?.cropper;

    if (!cropper) {
      return;
    }

    const izrezanaSlika = cropper
      .getCroppedCanvas()
      .toDataURL('image/jpeg');

    onSpremi(izrezanaSlika);
  }

  if (!slika) {
    return null;
  }

  return (
    <>
      <Cropper
        src={slika}
        style={{
          height: 400,
          width: '100%'
        }}
        initialAspectRatio={1}
        guides={true}
        viewMode={1}
        ref={cropperRef}
      />

      <button
        type="button"
        className="btn btn-primary mt-3"
        onClick={spremiIzrezanuSliku}
      >
        Spremi izrezanu sliku
      </button>
    </>
  );

}