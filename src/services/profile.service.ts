import Profile from '../models/sequelizes/profile.model';

export default class ProfileService {
    async create(data: any) {
        const user = await Profile.create(data);
        return await Profile.findByPk(user.id, { attributes: {exclude: []} });
    }

    async findOne(filter: any) {
        const profile = await Profile.findOne({ where: filter });
        return profile;
    }

    async findOneById(id: any) {
        const profile = await Profile.findByPk(id, { attributes: {exclude: []} });
        return profile;
    }

    async findOneWithFields(filter: any) {
        const profile = await Profile.findOne({ where: filter, attributes: {exclude: []} });
        return profile;
    }

    async findAll(filter: any) {
        const profiles = await Profile.findAll({ where: filter, attributes: {exclude: []} });
        return profiles;
    }

    async update(id: any, data: any) {
        const [numUpdated, updatedProfiles] = await Profile.update(data, { where: { id }, returning: true });
        return await Profile.findByPk(updatedProfiles[0].id, { attributes: {exclude: []} });
    }

    async softDelete(id: any) {
        const deletedRows = await Profile.destroy({ where: { id } });
        return;
    }

    async hardDelete(id: any) {
        await Profile.destroy({ where: { id }, force: true });
        return;
    }
}