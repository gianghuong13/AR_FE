module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Plugin Reanimated phải luôn ở cuối
      'react-native-reanimated/plugin',
    ],
  };
};
