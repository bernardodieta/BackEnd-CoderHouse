let generateCustomResponses = (req, res, next) => {
    res.sendSuccess = (payload) => res.status(200).send({ status: "Success", payload });
    res.sendCreateSuccess = (payload) => res.status(201).send({ status: "Save success", payload });
    res.sendEmptySucces = (payload) => res.status(204).send({ status: 'Empty response', payload })
    res.sendInternalServerError = (error) => res.status(500).send({ status: "Error", error });
    res.sendClientError = (error) => res.status(400).send({ status: "Client Error, Bad request from client.", error });
    res.sendUnauthorizedError = (error) => res.status(401).send({ error: "User not authenticated or missing token." });
    res.sendForbiddenError = (error) => res.status(403).send({ error: "Token invalid or user with no access, Unauthorized please check your roles!" });
    next();
};
export default generateCustomResponses;