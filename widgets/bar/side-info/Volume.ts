const audio = await Service.import("audio");

const VolumeIcon = () =>
  Widget.Icon({ size: 25 }).hook(audio.speaker, (self) => {
    const vol = audio.speaker.volume * 100;
    const icon = [
      [101, "overamplified"],
      [67, "high"],
      [34, "medium"],
      [1, "low"],
      [0, "muted"],
    ].find(([threshold]) => Number(threshold) <= vol)?.[1];

    if (audio.speaker.is_muted) {
      self.icon = `audio-volume-muted-symbolic`;
    } else {
      self.icon = `audio-volume-${icon}-symbolic`;
    }
  });

const VolumePercent = () =>
  Widget.Label().hook(audio.speaker, (self) => {
    const vol = audio.speaker.volume * 100;

    self.label = `${Math.round(vol)}%`;
  });

const Volume = () =>
  Widget.Button({
    child: Widget.Box({
      spacing: 4,
      children: [VolumeIcon(), VolumePercent()],
    }),
  });

export default Volume;
