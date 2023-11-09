"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../../services/auth");
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const user = yield (0, auth_1.findByEmail)(email);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const isMatch = yield user.matchPassword(password);
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid credentials" });
            }
            console.log(user);
            const token = user.getSignedJwtToken();
            res.status(200).json({ message: "User logged in successfully", token });
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    });
}
exports.default = login;
