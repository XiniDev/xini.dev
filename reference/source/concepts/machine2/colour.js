// The palette is authored as display colours, the shaders work in display space and canvas textures arrive
// untouched, so three's sRGB-to-linear conversion of THREE.Color is switched off for this page: a hex in the
// palette renders as that hex, the same as the cards. (Imported first, before anything builds a colour.)
import * as THREE from 'three';
THREE.ColorManagement.enabled = false;
