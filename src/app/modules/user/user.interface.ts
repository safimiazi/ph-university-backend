export type TUser = {
    id: String;
    password: String;
    needsPasswordChange: Boolean;
    role: 'admin' | 'student' | 'faculty';
    status: 'in-progress' | 'blocked';
    isDeleted: Boolean;
}

