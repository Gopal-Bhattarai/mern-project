
export const containerDiv = {
    hidden: {
        opacity: 0,
        x: '100vw'
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: 'spring',
            delay: 0.5,
            delayChildren: 0.5,
            when: "beforeChildren"
        }
    },
    hover: {

    }
}

export const welcomeBackDiv = {
    hidden: {
        x: '100vw'
    },
    visible: {
        x: 0,
        transition: {
            type: 'spring',
            stiffness: 500,
            delay: 1
        }
    },
    hover: {
        scale: 1.1,
        textShadow: "0px 0px 8px rbg(255,255,255)",
        boxShadow: "0px 0px 8px rbg(255,255,255)"
    }
}

export const buttonVariant = {
    hover: {
        scale: 1.1,
        border: "2px solid ",
        boxShadow: "0px 0px 8px "
    }
}

