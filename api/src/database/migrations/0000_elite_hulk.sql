CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`fullname` text,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`verified` integer DEFAULT false,
	`avatar` text,
	`verificationToken` text NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE TABLE `business_company` (
	`id` text PRIMARY KEY NOT NULL,
	`description` text,
	`title` text NOT NULL,
	`logo` text,
	`companySlug` text NOT NULL,
	`industry` text NOT NULL,
	`residence` text NOT NULL,
	`bin` text NOT NULL,
	`author` text NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`author`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `business_company_companySlug_unique` ON `business_company` (`companySlug`);--> statement-breakpoint
CREATE INDEX `title_bin_residence_idx` ON `business_company` (`title`,`bin`,`residence`);--> statement-breakpoint
CREATE TABLE `business_department` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`author` text NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`author`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `business_position` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`author` text NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`author`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `business_structure` (
	`id` text PRIMARY KEY NOT NULL,
	`position` text,
	`department` text,
	`company` text NOT NULL,
	`employee` text,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`position`) REFERENCES `business_position`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`department`) REFERENCES `business_department`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`company`) REFERENCES `business_company`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`employee`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `crm_contact` (
	`id` text PRIMARY KEY NOT NULL,
	`company` text,
	`user` text,
	`addressLine` text NOT NULL,
	`city` text NOT NULL,
	`state` text NOT NULL,
	`postCode` text NOT NULL,
	`country` text,
	`phone` text NOT NULL,
	`email` text NOT NULL,
	`website` text NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`company`) REFERENCES `business_company`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `crm_inquiry` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`message` text NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`status` text DEFAULT 'open' NOT NULL,
	`author` text,
	`reply` text,
	FOREIGN KEY (`author`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `post` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`coverImage` text,
	`author` text,
	`status` text DEFAULT 'draft' NOT NULL,
	`parent` text,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`author`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`parent`) REFERENCES `post`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `erm_consequence` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `erm_scale` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`impact` integer NOT NULL,
	`likelihood` integer NOT NULL,
	`score` integer NOT NULL,
	`company` text,
	`description` text NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`company`) REFERENCES `business_company`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `erm_score` (
	`id` text PRIMARY KEY NOT NULL,
	`risk` text,
	`company` text,
	`impact` integer NOT NULL,
	`likelihood` integer NOT NULL,
	`score` integer NOT NULL,
	`scale` text,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`risk`) REFERENCES `erm_risk`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`company`) REFERENCES `business_company`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`scale`) REFERENCES `erm_scale`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `erm_factor` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `erm_risk` (
	`id` text PRIMARY KEY NOT NULL,
	`company` text,
	`description` text NOT NULL,
	`factor` text,
	`consequence` text,
	`riskOwner` text,
	`author` text,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`actions` text,
	FOREIGN KEY (`company`) REFERENCES `business_company`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`factor`) REFERENCES `erm_factor`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`consequence`) REFERENCES `erm_consequence`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`riskOwner`) REFERENCES `business_structure`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`author`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`actions`) REFERENCES `task`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `permission` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `permission_title_unique` ON `permission` (`title`);--> statement-breakpoint
CREATE TABLE `role_permission` (
	`id` text PRIMARY KEY NOT NULL,
	`role_id` text,
	`permission_id` text,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`role_id`) REFERENCES `role`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`permission_id`) REFERENCES `permission`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `role` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `role_title_unique` ON `role` (`title`);--> statement-breakpoint
CREATE TABLE `user_role` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`role_id` text,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`role_id`) REFERENCES `role`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `sox_control` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`risk_owner` text,
	`company` text,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`risk_owner`) REFERENCES `business_structure`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`company`) REFERENCES `business_company`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `sox_process` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`author` text,
	`process_owner` text,
	`company` text,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`parent` text,
	FOREIGN KEY (`author`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`process_owner`) REFERENCES `business_structure`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`company`) REFERENCES `business_company`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`parent`) REFERENCES `sox_process`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `sox_rcm` (
	`id` text PRIMARY KEY NOT NULL,
	`process` text,
	`risk` text,
	`control` text,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`process`) REFERENCES `sox_process`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`risk`) REFERENCES `erm_risk`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`control`) REFERENCES `sox_control`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `task` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`author` text,
	`responsible` text,
	`startDate` text,
	`dueDate` text,
	`completedDate` text,
	`status` text,
	`company` text,
	FOREIGN KEY (`author`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`responsible`) REFERENCES `business_structure`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`company`) REFERENCES `business_company`(`id`) ON UPDATE no action ON DELETE no action
);
