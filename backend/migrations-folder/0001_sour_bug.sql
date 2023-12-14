CREATE TABLE `AttachPhotosRequests` (
	`PhotoKey` varchar(80) NOT NULL,
	`AlbumId` varchar(70) NOT NULL,
	`PhoneNumbers` varchar(256) NOT NULL
);
--> statement-breakpoint
ALTER TABLE `AttachPhotosRequests` ADD CONSTRAINT `AttachPhotosRequests_AlbumId_Albums_Id_fk` FOREIGN KEY (`AlbumId`) REFERENCES `Albums`(`Id`) ON DELETE no action ON UPDATE no action;