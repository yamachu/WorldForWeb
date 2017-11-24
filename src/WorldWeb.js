import Module from '../wasm/world';

export default class WorldWeb {
    static Initialize() {
        WorldWeb.isInitialized = false;

        return new Promise((resolve, reject) => {
            fetch('./wasm/world.wasm')
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

    static GetSpeechFeaturesAsync(x, fs, f0_length, fft_size) {
        return new Promise((resolve, reject) => {
            if (!WorldWeb.checkModuleEnabled()) reject('WorldWeb is not initialized');
            if (f0_length === undefined) f0_length = WorldWeb.GetF0Length(x.length, fs);
            if (fft_size === undefined) fft_size = WorldWeb.GetFFTSize(fs);
    
            let pointer_x = WorldWeb.SetFloat64ArrayPointer(x);
            let pointer_f0 = WorldWeb.GetFloat64ArrayPointer(f0_length);
            let pointer_sp = WorldWeb.GetFloat64ArrayPointer(f0_length * (fft_size / 2 + 1));
            let pointer_ap = WorldWeb.GetFloat64ArrayPointer(f0_length * (fft_size / 2 + 1));
    
            WorldWeb.functions.GetSpeechFeatures(pointer_x, x.length, fs, pointer_f0.pointer, f0_length, pointer_sp.pointer, pointer_ap.pointer, fft_size);
    
            // Heap to JS TypedArray
            let f0 = WorldWeb.GetFloat64ArrayFromPointerWithOffset(pointer_f0, f0_length);
            let sp = WorldWeb.GetFloat64ArrayFromPointerWithOffset(pointer_sp, f0_length * (fft_size / 2 + 1));
            let ap = WorldWeb.GetFloat64ArrayFromPointerWithOffset(pointer_ap, f0_length * (fft_size / 2 + 1));
    
            // Free memory
            WorldWeb.module._free(pointer_x);
            WorldWeb.module._free(pointer_f0.pointer);
            WorldWeb.module._free(pointer_sp.pointer);
            WorldWeb.module._free(pointer_ap.pointer);
    
            resolve({
                fs: fs,
                f0_length: f0_length,
                fft_size: fft_size,
                f0: f0,
                sp: sp,
                ap: ap
            });
        });
    }

    static GetSynthesisFormLength(f0_length, fs) {
        if (!WorldWeb.checkModuleEnabled()) return null;
        return WorldWeb.functions.GetSynthesisFormLength(f0_length, fs);
    }

    static GetSynthesisFormAsync(world_parameters) {
        return new Promise((resolve, reject) => {
            if (!WorldWeb.checkModuleEnabled()) reject('WorldWeb is not initialized');
            if (f0_length === undefined) f0_length = WorldWeb.GetF0Length(x.length, fs);
            if (fft_size === undefined) fft_size = WorldWeb.GetFFTSize(fs);
    
            let pointer_f0 = WorldWeb.SetFloat64ArrayPointer(world_parameters.f0);
            let pointer_sp = WorldWeb.SetFloat64ArrayPointer(world_parameters.sp);
            let pointer_ap = WorldWeb.SetFloat64ArrayPointer(world_parameters.ap);

            let y_length = WorldWeb.GetSynthesisFormLength(world_parameters.f0_length, world_parameters.fs);
            let pointer_y = WorldWeb.GetFloat64ArrayPointer(y_length);
    
            WorldWeb.functions.GetSynthesisForm(world_parameters.fs, pointer_f0, world_parameters.f0_length, pointer_sp.pointer, pointer_ap.pointer, world_parameters.fft_size, pointer_y.pointer, y_length);
    
            // Heap to JS TypedArray
            let y = WorldWeb.GetFloat64ArrayFromPointerWithOffset(pointer_y, y_length);
    
            // Free memory
            WorldWeb.module._free(pointer_y.pointer);
            WorldWeb.module._free(pointer_f0);
            WorldWeb.module._free(pointer_sp);
            WorldWeb.module._free(pointer_ap);
    
            resolve(y);
        });
    }

    static SetFloat64ArrayPointer(arr) {
        let arr_pointer = WorldWeb.module._malloc(arr.length * 8);
        let arr_offset = arr_pointer / 8;
        WorldWeb.module.HEAPF64.set(arr, arr_offset);

        return arr_pointer;
    }

    static GetFloat64ArrayPointer(length) {
        let pointer = WorldWeb.module._malloc(length * 8);
        let offset = pointer / 8;

        return {
            pointer: pointer,
            offset: offset
        };
    }

    static GetFloat64ArrayFromPointerWithOffset(pointer_with_offset, length) {
        return new Float64Array(WorldWeb.module.HEAPF64.subarray(pointer_with_offset.offset, pointer_with_offset.offset + length));
    }
}