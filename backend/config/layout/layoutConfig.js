import LAYOUT_PRESETS from './layoutPresets.js';

const getFinalLayoutConfig = (presetName) => {
  const preset = LAYOUT_PRESETS[presetName];

  if (!preset) {
    throw new Error(`Invalid layout preset: ${presetName}`);
  }

  return preset;
};

export default getFinalLayoutConfig;
