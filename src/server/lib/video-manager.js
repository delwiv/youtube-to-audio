import path from 'path';
import kue from 'kue';
import Encoder from './encoder';
import Downloader from './downloader';
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
    console.log(`start encoding ${filename}`);
    jobs.create('convert', {
        title: `Converting ${filename}`,
        filename,
        userId
    }).save();
};

jobs.process('download', NB_PARALLEL_DOWNLOADS, (job, done) => {
    const { link, userId } = job.data;
    const output = path.join(__dirname, '../storage/downloading');

    const dl = new Downloader(link, output);

    let videoFilename = '';

    dl.download(
        info => {
            const { size, filename } = info;
            videoFilename = filename;
            console.log('Download started');
            console.log(`filename:  ${filename}`);
            console.log(`size:  ${size}`);
        },
        progress => {
            console.log(`${progress}% - ${videoFilename}`);
        },
        () => {
            console.log('DL finished');
            const downloadedFile = path.join(__dirname, `../storage/downloaded/${videoFilename}`);
            mv(`${output}/${videoFilename}`, downloadedFile, err => {
                if (err) console.log(err);
                console.log('start converting');
                console.log(downloadedFile);
                startConvert({ filename: path.basename(downloadedFile), userId });
                done();
            });
        });
});

jobs.process('convert', NB_PARALLEL_CONVERTIONS, (job, done) => {
    const { filename, userId } = job.data;

    const ext = path.extname(filename);

    const input = path.join(__dirname, `../storage/downloaded/${filename}`);
    const output = path.join(__dirname, `../storage/audio/${filename.replace(ext, '.m4a')}`);

    const encoder = new Encoder(input, output);

    encoder.encode(progress => console.log(`progress: ${progress} - ${filename}`), (err, success, dest) => {
        console.log('encoding finished');
        console.log(`file: ${dest}`);
    })
});
