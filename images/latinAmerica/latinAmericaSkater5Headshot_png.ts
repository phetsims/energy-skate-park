/* eslint-disable */
import asyncLoader from '../../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;