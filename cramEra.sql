CREATE SCHEMA cramera;
USE cramera; 

CREATE TABLE users (
	users_ID int AUTO_INCREMENT, 
    user_name varchar(20), 
    user_email varchar(40), 
    created_at timestamp DEFAULT CURRENT_TIMESTAMP, 
    CONSTRAINT users_IDPK PRIMARY KEY (users_ID)
);

CREATE TABLE schools (	
	schools_ID int AUTO_INCREMENT, 
    school_name varchar(50), 
    school_description varchar(50), 
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT schools_IDPK PRIMARY KEY (schools_ID)
);

CREATE TABLE modules (
	modules_ID int AUTO_INCREMENT, 
    school_ID int, 
    module_code char(5), 
    module_name varchar(20),
    module_description varchar(500), 
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT modules_IDPK PRIMARY KEY (modules_ID),
    CONSTRAINT school_IDFK FOREIGN KEY (school_ID) REFERENCES schools(schools_ID)
);

CREATE TABLE courses (
	courses_ID int AUTO_INCREMENT, 
    school_ID int, 
    course_name varchar(50), 
    description varchar(50), 
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT courses_IDPK PRIMARY KEY (courses_ID), 
    CONSTRAINT school2_IDFK FOREIGN KEY (school_ID) REFERENCES schools(schools_ID)
);

CREATE TABLE documents (  
	id int NOT NULL AUTO_INCREMENT,     
    owner_user_ID int,     
    original_uploader_ID int,     
    module_ID int,     
    title varchar(50) NOT NULL,    
    description varchar(8000) DEFAULT NULL,     
    file_URL varchar(255) NOT NULL,     
    file_type varchar(25) NOT NULL, 
    visibility varchar(10) DEFAULT 'public',
    document_type varchar(20) DEFAULT 'document',
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
    CONSTRAINT documentsPK PRIMARY KEY (id), 
    CONSTRAINT owner_userFK FOREIGN KEY (owner_user_ID) REFERENCES users (users_ID),
	CONSTRAINT moduleFK FOREIGN KEY (module_ID) REFERENCES modules(modules_ID) 
);

CREATE TABLE folders (
	folders_ID int AUTO_INCREMENT, 
    user_ID int, 
    folder_name varchar(50), 
    CONSTRAINT folders_IDPK PRIMARY KEY (folders_ID), 
    CONSTRAINT user_IDFK FOREIGN KEY (user_ID) REFERENCES users(users_ID)
		ON DELETE CASCADE
);

CREATE TABLE tags (
	tags_ID int AUTO_INCREMENT, 
    tag_name varchar(20), 
	CONSTRAINT tagS_IDPK PRIMARY KEY (tags_ID)
);


CREATE TABLE document_ratings (
	document_ratingsID int AUTO_INCREMENT, 
    user_ID int, 
    document_ID int, 
    rating int, 
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT document_ratingsIDPK PRIMARY KEY (document_ratingsID),
    CONSTRAINT user2_IDFK FOREIGN KEY (user_ID) REFERENCES users (users_ID)
		ON DELETE CASCADE,
    CONSTRAINT document2_IDFK FOREIGN KEY (document_ID) REFERENCES documents (id) 
		ON DELETE CASCADE
);

CREATE TABLE course_modules (
	course_modules_ID int AUTO_INCREMENT, 
    module_ID int, 
    course_ID int,
    CONSTRAINT course_module_IDPK PRIMARY KEY (course_modules_ID), 
    CONSTRAINT module2_IDFK FOREIGN KEY (module_ID) REFERENCES modules(modules_ID)
		ON DELETE CASCADE,
    CONSTRAINT course_IDFK FOREIGN KEY (course_ID) REFERENCES courses(courses_ID)
		ON DELETE CASCADE
);


CREATE TABLE saved_documents (
	document_ID int NOT NULL AUTO_INCREMENT, 
    user_ID int NOT NULL, 
    folder_ID int, 
	CONSTRAINT document_user_IDPK PRIMARY KEY (document_ID, user_ID), 
    CONSTRAINT document_IDFK FOREIGN KEY (document_ID) REFERENCES documents(id)
		ON DELETE CASCADE,
    CONSTRAINT user3_IDFK FOREIGN KEY (user_ID) REFERENCES users(users_ID)
		ON DELETE CASCADE,
    CONSTRAINT folder_IDFK FOREIGN KEY (folder_ID) REFERENCES folders(folders_ID)
		ON DELETE SET NULL
);

CREATE TABLE document_tags (
	document_ID int AUTO_INCREMENT, 
    tag_ID int, 
    CONSTRAINT document_IDPK PRIMARY KEY (document_ID, tag_ID), 
    CONSTRAINT document3_IDFK FOREIGN KEY (document_ID) REFERENCES documents(id),
    CONSTRAINT tag_IDFK FOREIGN KEY (tag_ID) REFERENCES tags(tags_ID)
);


-- 1. Insert Users
INSERT INTO users (users_ID, user_name, user_email) VALUES
(1, 'Alice Smith', 'alice@example.com'),
(2, 'Bob Jones', 'bob@example.com'),
(3, 'Charlie Brown', 'charlie@example.com');

-- 2. Insert Schools
INSERT INTO schools (schools_ID, school_name, school_description) VALUES
(1, 'School of Computing', 'Computer Science and Information Systems'),
(2, 'School of Business', 'Business Administration and Management'),
(3, 'School of Science', 'Natural and Applied Sciences');

-- 3. Insert Modules (Requires valid school_ID)
INSERT INTO modules (modules_ID, school_ID, module_code, module_name, module_description) VALUES
(1, 1, 'CS102', 'Intro to Java', 'Foundations of object-oriented programming.'),
(2, 2, 'BA202', 'Marketing 101', 'Introduction to global marketing principles.'),
(3, 3, 'ST302', 'Statistics', 'Probability theory and Bayesian inference.');

-- 4. Insert Courses (Requires valid school_ID)
INSERT INTO courses (courses_ID, school_ID, course_name, description) VALUES
(1, 1, 'BSc Computer Science', 'Undergraduate CS degree program.'),
(2, 2, 'BBA Business Admin', 'Undergraduate Business degree program.'),
(3, 3, 'BSc Data Science', 'Undergraduate Data Science degree program.');

-- 5. Insert Folders (Requires valid user_ID)
INSERT INTO folders (folders_ID, user_ID, folder_name) VALUES
(1, 1, 'Programming Prep'),
(2, 2, 'Business Notes'),
(3, 3, 'Math Reviews');

-- 6. Insert Tags
INSERT INTO tags (tags_ID, tag_name) VALUES
(1, 'Exam Prep'),
(2, 'Cheatsheet'),
(3, 'Lecture Notes');

-- 7. Insert Course Modules (Requires valid module_ID and course_ID)
INSERT INTO course_modules (course_modules_ID, module_ID, course_ID) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3);

SELECT USER();


