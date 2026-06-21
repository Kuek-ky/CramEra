package com.cram_era.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("examplehere")
public class testcontroller {

	@GetMapping(path="/testing") //find this on localhost:8080/examplehere/testing, using postman
	public String getTest() {
		return "if you can see this, get is successful :D";
	}

}