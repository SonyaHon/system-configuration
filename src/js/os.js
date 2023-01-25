const MacOS = 'macos';
const Windows = 'windows';
const Linux = 'linux';

function getCurrent() {
    switch(process.platform) {
    case 'darwin':
	return MacOS;
    case 'linux':
	return Linux;
    case 'win32':
	return Windows;
    }
}

module.exports = {
    MacOS,
    Windows,
    Linux,

    getCurrent,
};
