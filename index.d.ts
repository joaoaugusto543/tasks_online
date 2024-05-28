declare module '*.jpg'

declare module 'react-native-gravatar' {
    import { Component } from 'react'
    import { ImageProps } from 'react-native'

    interface GravatarOptions {
        size?: number
        rating?: 'g' | 'pg' | 'r' | 'x'
        default?: '404' | 'mm' | 'identicon' | 'monsterid' | 'wavatar' | 'retro' | 'blank'
        forcedefault?: 'y'
    }

    interface GravatarProps extends ImageProps {
        email: string
        options?: GravatarOptions
    }

    // Declare o componente Gravatar
    export default class Gravatar extends Component<GravatarProps> {}
}
