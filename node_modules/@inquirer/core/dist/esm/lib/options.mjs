export async function getPromptConfig(option) {
    const message = typeof option.message === 'function' ? option.message() : option.message;
    return {
        validate: () => true,
        ...option,
        message: await message,
    };
}
