import React from "react";
import { CgCloseR } from "react-icons/cg";

const VideoModal = (props) => {
  return (
    <>
      <div className="youtube_frame">
        <iframe
          title={props.src}
          allowFullScreen
          frameBorder="0"
          height="100%"
          src={props.src}
          width="100%"
        />
        <div className="close_button" onClick={() => props.setShown(false)}>
          <CgCloseR size="25" className="close" />
        </div>
      </div>
    </>
  );
};

export default VideoModal;
