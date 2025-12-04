const VideoPlayer = ({ videoUrl, title }) => {
  return (
    <div className="bg-black w-full aspect-video md:h-[450px] flex items-center justify-center relative group">
      <iframe
        title={title}
        src={videoUrl.replace("watch?v=", "embed/")}
        className="w-full h-full"
        allowFullScreen
      />
    </div>
  );
};

export default VideoPlayer;
