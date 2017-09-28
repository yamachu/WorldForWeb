#!/bin/bash -ex

emcc wasm/world-wrapper.cpp wasm/World/src/*.cpp \
-s WASM=1 \
-s "MODULARIZE=1" \
-Iwasm/World/src \
-s "EXPORTED_FUNCTIONS=['_GetF0Length', '_GetFFTSize', '_GetSpeechFeatures', '_GetSynthesisFormLength', '_GetSynthesisForm']" \
-s "ALLOW_MEMORY_GROWTH=1" \
-o wasm/world.js && \
echo 'export default Module;' >> wasm/world.js
