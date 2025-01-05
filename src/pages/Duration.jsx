import React, { useMemo } from "react";

let Duration = ({ songs }) => {
  let formattedDuration = useMemo(() => {
    let totalDuration = (songs || []).reduce((sum, song) => sum + (song.durationInMs || 0), 0);
    let minutes = Math.floor(totalDuration / 60000);
    let seconds = Math.floor((totalDuration % 60000) / 1000);
    return `${minutes} min ${seconds} sec`;
  }, [songs]);

  return <span>{formattedDuration}</span>;
};

export default Duration;
