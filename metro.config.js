const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');

defaultConfig.resolver.assetExts.push('svg');

module.exports = defaultConfig;
