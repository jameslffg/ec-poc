import { Client, Account, Storage } from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66100ff00dfecdc22920');

export const account = new Account(client);
export { ID } from 'appwrite';

export const storage = new Storage(client);
export const createFile = (file, id) => {
    return storage.createFile(
        '661559f889b9e548ceda',
        id.unique(),
        file
    );
};
