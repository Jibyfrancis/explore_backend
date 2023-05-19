export default function createPropertyEntity(...args:any) {
  return {
    getName: () => args[0].name,
    getDescription: () => args[0].description,
    getRoomType: () => args[0].roomType,
    getLocation: () => args[0].location,
    getAddress: () => args[0].address,
    getPrice: () => args[0].price,
    getGuest: () => args[0].guest,
    getBedroom: () => args[0].bedroom,
    getBathrooms: () => args[0].bathrooms,
    getKitchen: () => args[0].kitchen,
    getBalcony: () => args[0].balcony,
    getAmenities: () => args[0].amenities,
    getUserId: () => args[0].userId,
    getImageUrl: () => args[0].imageUrl,
  };
}