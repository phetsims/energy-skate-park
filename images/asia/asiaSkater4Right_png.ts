/* eslint-disable */
import asyncLoader from '../../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;