/* eslint-disable */
import asyncLoader from '../../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;