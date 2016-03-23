import ffmpeg from 'fluent-ffmpeg';

export default class Encoder {
    constructor(baseFile, destFile) {
        this.baseFile = baseFile;
        this.destFile = destFile;
    }

    encode(onProgress, done) {
        const dest = this.destFile;

        ffmpeg()
            .input(this.baseFile)
            .output(this.destFile)
            .noVideo()
            .audioCodec('aac')
            .audioBitrate('384k')
            .audioFrequency(48000)
            .on('error', err => {
                console.error(err);
                done(err, false, null);
            })
            .on('progress', p => !!p && onProgress(p.percent))
            .on('end', () => done(null, true, dest))
            .run();

        return this.destFile;
    }

    meta() {
        ffmpeg.ffprobe(this.baseFile, (err, meta) => !!err ?
            Promise.reject(err) :
            Promise.resolve(meta));
    }
}
