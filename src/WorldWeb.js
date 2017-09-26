import Module from '../wasm/world';

export default class WorldWeb {
    static Initialize() {
        WorldWeb.isInitialized = false;

        return new Promise((resolve, reject) => {
            fetch('../wasm/world.wasm')
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.arrayBuffer();
            })
            .then(buffer => new Uint8Array(buffer))
            .then(binary => {
                let moduleArgs = {
                    wasmBinary: binary,
                    onRuntimeInitialized: () => {
                        WorldWeb.assignFunctions();
                        WorldWeb.isInitialized = true;
                        resolve();
                    }
                };
                WorldWeb.module = Module(moduleArgs);
            })
            .catch(err => {
                reject(err);
            });
        })
    }

    static assignFunctions() {
        if (WorldWeb.isInitialized) return;

        WorldWeb.functions = {};
        // int GetF0Length(int x_length, int fs)
        WorldWeb.functions.GetF0Length = WorldWeb.module.cwrap('GetF0Length', 'number', ['number', 'number']);
        // int GetFFTSize(int fs)
        WorldWeb.functions.GetFFTSize = WorldWeb.module.cwrap('GetFFTSize', 'number', ['number']);
        // void GetSpeechFeatures(const double* x, int x_length, int fs, double* f0, int f0_length, double* sp, double *ap, int fft_size)
        WorldWeb.functions.GetSpeechFeatures = WorldWeb.module.cwrap('GetSpeechFeatures', 'number', ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number']);
        // int GetSynthesisFormLength(int f0_length, int fs)
        WorldWeb.functions.GetSynthesisFormLength = WorldWeb.module.cwrap('GetSynthesisFormLength', 'number', ['number', 'number']);
        // void GetSynthesisForm(int fs, const double* f0, int f0_length, const double* sp, const double* ap, int fft_size, double* y, int y_length)
        WorldWeb.functions.GetSynthesisForm = WorldWeb.module.cwrap('GetSynthesisForm', 'number', ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number']);
    }

    static checkModuleEnabled() {
        return WorldWeb.isInitialized && WorldWeb.functions != undefined;
    }

    static GetF0Length(x_length, fs) {
        if (!WorldWeb.checkModuleEnabled()) return null;
        return WorldWeb.functions.GetF0Length(x_length, fs);
    }

    static GetFFTSize(fs) {
        if (!WorldWeb.checkModuleEnabled()) return null;
        return WorldWeb.functions.GetFFTSize(fs);
    }

    static GetSpeechFeatures(x, fs, f0_length, fft_size) {
        if (!WorldWeb.checkModuleEnabled()) return null;
        if (f0_length === undefined) f0_length = WorldWeb.GetF0Length(x.length, fs);
        if (fft_size === undefined) fft_size = WorldWeb.GetFFTSize(fs);

        // X - input waveform
        let pointer_x = WorldWeb.module._malloc(x.length * 8); // 64bit => 8byte
        let offset_x = pointer_x / 8;
        WorldWeb.module.HEAPF64.set(x, offset_x);

        // F0
        let pointer_f0 = WorldWeb.module._malloc(f0_length * 8);
        let offset_f0 = pointer_f0 / 8;

        // Spectrogram
        let pointer_sp = WorldWeb.module._malloc((f0_length * (fft_size / 2 + 1)) * 8);
        let offset_sp = pointer_sp / 8;

        // F0
        let pointer_ap = WorldWeb.module._malloc((f0_length * (fft_size / 2 + 1)) * 8);
        let offset_ap = pointer_ap / 8;

        WorldWeb.functions.GetSpeechFeatures(pointer_x, x.length, fs, pointer_f0, f0_length, pointer_sp, pointer_ap, fft_size);

        // Heap to JS TypedArray
        let f0 = new Float64Array(WorldWeb.module.HEAPF64.buffer, pointer_f0, f0_length);
        let sp = new Float64Array(WorldWeb.module.HEAPF64.buffer, pointer_sp, f0_length * (fft_size / 2 + 1));
        let ap = new Float64Array(WorldWeb.module.HEAPF64.buffer, pointer_ap, f0_length * (fft_size / 2 + 1));

        // Free memory
        WorldWeb.module._free(pointer_x);
        WorldWeb.module._free(pointer_f0);
        WorldWeb.module._free(pointer_sp);
        WorldWeb.module._free(pointer_ap);

        return {
            fs: fs,
            f0_length: f0_length,
            fft_size: fft_size,
            f0: f0,
            sp: sp,
            ap: ap
        };
    }

    static GetSynthesisFormLength(f0_length, fs) {
        if (!WorldWeb.checkModuleEnabled()) return null;
        return WorldWeb.functions.GetSynthesisFormLength(f0_length, fs);
    }

    static GetSynthesisForm(world_parameters) {

    }
}