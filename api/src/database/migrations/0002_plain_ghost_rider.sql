DROP TABLE `erm_consequence`;--> statement-breakpoint
DROP TABLE `erm_factor`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_erm_risk` (
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
	FOREIGN KEY (`riskOwner`) REFERENCES `business_structure`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`author`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`actions`) REFERENCES `task`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_erm_risk`("id", "company", "description", "factor", "consequence", "riskOwner", "author", "createdAt", "updatedAt", "actions") SELECT "id", "company", "description", "factor", "consequence", "riskOwner", "author", "createdAt", "updatedAt", "actions" FROM `erm_risk`;--> statement-breakpoint
DROP TABLE `erm_risk`;--> statement-breakpoint
ALTER TABLE `__new_erm_risk` RENAME TO `erm_risk`;--> statement-breakpoint
PRAGMA foreign_keys=ON;