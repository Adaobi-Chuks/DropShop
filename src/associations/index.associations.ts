import productCategoryAssociation from "./productCategory.associations";
import productImageAssociation from "./productImage.associations";
import userProductAssociation from "./userProduct.associations";
import userProfileAssociation from "./userProfile.associations";

export default function createAssociations(): void {
    userProfileAssociation();
    userProductAssociation();
    productImageAssociation();
    productCategoryAssociation();
}