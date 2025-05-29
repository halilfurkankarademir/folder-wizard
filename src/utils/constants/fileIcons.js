import {
    FaFileAudio,
    FaPhotoVideo,
    FaFile,
    FaFileArchive,
    FaFileCode,
    FaFileAlt,
} from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";
import {
    SiAdobeaftereffects,
    SiAdobeillustrator,
    SiAdobephotoshop,
} from "react-icons/si";

const fileIcons = {
    image: FaPhotoVideo,
    video: FaPhotoVideo,
    audio: FaFileAudio,
    pdfDocument: FaFilePdf,
    document: FaFileAlt,
    code: FaFileCode,
    archive: FaFileArchive,
    executable: FaFile,
    diskimage: FaFile,
    package: FaFile,
    aftereffects: SiAdobeaftereffects,
    illustrator: SiAdobeillustrator,
    photoshop: SiAdobephotoshop,
    premiere: FaFile,
    default: FaFile,
};

export default fileIcons;
