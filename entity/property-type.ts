export default function propertyTypeEntity(...args: any) {
    return {
        getName: () => args[0].name,
        getImageUrl: () => args[0].imageUrl
    }
}