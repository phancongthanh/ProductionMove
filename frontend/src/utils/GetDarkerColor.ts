export function adjust(color: string, amount: number) {
    return '#' + color.replace(/^#/, '').replace(/../g, (color: string) => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}

export const getDarkerColor = (color: string) => {
    return adjust(color , -20)
}