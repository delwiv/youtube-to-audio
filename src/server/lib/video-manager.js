import youtubedl from 'youtube-dl';
import path from 'path';
import fs from 'fs';
import kue from 'kue';
import ffmpeg from 'ffmpeg';
import mv from 'mv';


const NB_PARALLEL_DOWNLOADS = 4;
const NB_PARALLEL_CONVERTIONS = 4;

const jobs = kue.createQueue();

export const startDownload = (link, userId) => {
    jobs.create('download', {
        title: `Downloading ${link}`,
        link,
        userId
    }).save();
};

const startConvert = params => {
    const { filename, userId } = params;
    jobs.create('convert', {
        title: `Converting ${filename}`,
        filename,
        userId
    }).save();
};

jobs.process('download', NB_PARALLEL_DOWNLOADS, (job, done) => {
    const { link, userId } = job.data;

    const video = youtubedl(link, ['--force-ipv4', '--format=18'], {});
    video.on('info', info => {
        const size = info.size;
        const filename = info._filename;
        console.log('Download started');
        console.log(`filename:  ${filename}`);
        console.log(`size:  ${size}`);
        // console.log(info);

        video.custom = {
            output: path.join(__dirname, `../storage/downloading/${filename}`),
            filename,
            pos: 0,
            size: info.size
        };

        video.pipe(fs.createWriteStream(video.custom.output));

        video.on('data', data => {
            video.custom.pos += data.length;
            // `size` should not be 0 here.
            if (video.custom.size) {
                video.custom.percent = (video.custom.pos / video.custom.size * 100).toFixed(2);
                // process.stdout.cursorTo(0);
                // process.stdout.clearLine(1);
                console.log(`${video.custom.percent}% - ${video.custom.filename}`);
                // console.log(data);

            }
        });

        video.on('end', () => {
            console.log('DL finished');
            video.custom.status = 'converting';
            video.custom.percent = 100;
            mv(video.custom.output, `${__dirname}/../storage/downloaded/${filename}`, err => {
                if (err) console.log(err);
                console.log('start converting');
                console.log(filename);
                startConvert({ filename, userId });
                done();
            });
        });
    });
});

jobs.process('convert', NB_PARALLEL_CONVERTIONS, (job, done) => {
    const { filename, userId } = job.data;

    try {
        new ffmpeg(path.join(__dirname, `../storage/downloaded/${filename}`))
            .then(video => video
                .fnExtractSoundToMP3(path.join(__dirname, `../storage/audio/${filename}`), (err, file) => {
                    console.log(`conversion finished : ${file} - err : ${err}`);
                    done();
                })
            , err => {
                console.log(err);
                done();
            });
    } catch (e) {
        console.log(e);
        done();
    }
});
