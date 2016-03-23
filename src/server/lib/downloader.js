import youtubedl from 'youtube-dl';
import fs from 'fs';


export default class Downloader {
    constructor(link, output) {
        this.link = link;
        this.output = output;
    }

    download(onInfo, onProgress, done) {
        const video = youtubedl(this.link, ['--force-ipv4', '--format=18'], {});
        video.on('info', info => {
            const size = info.size;
            const filename = info._filename;
            let progress = 0;
            onInfo({ size, filename });

            video.pipe(fs.createWriteStream(`${this.output}/${filename}`));

            video.on('data', data => {
                progress += data.length;
                const percent = (progress / size * 100).toFixed(2);

                onProgress(percent);
            });

            video.on('end', done);
        });
    }
}
