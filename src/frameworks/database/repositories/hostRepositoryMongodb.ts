import { HostInterface } from "../../../type/hostInterface";
import Host from "../model/hostModel";
import User from "../model/userModel";

export const hostRepositoryMongoDb = () => {
  const addHost = async (host: any) => {
    const newHost = new Host({
      fullName: host.getFullName(),
      userId: host.getUserId(),
      dateOfBirth: host.getDateOfBirth(),
      address: host.getAddress(),
      aadharNumber: host.getAadharNumber(),
      pancardNumber: host.getPancardNumber(),
    });

    return await Host.create(newHost).then(() => {
      return User.updateOne({ _id: newHost.userId }, [
        { $set: { hostingRequest: { $not: "$hostingRequest" } } },
      ]);
    });
  };
  return {
    addHost,
  };
};
export type HostRepositoryMongoDb = typeof hostRepositoryMongoDb;
