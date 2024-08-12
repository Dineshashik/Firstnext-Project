function convertToTitleCase(input: string): string {
    return input
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Step 2: Capitalize first letter
        .join(' ');
}

export default convertToTitleCase